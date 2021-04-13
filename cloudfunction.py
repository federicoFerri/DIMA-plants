from exponent_server_sdk import (
    DeviceNotRegisteredError,
    PushClient,
    PushMessage,
) 
from requests.exceptions import ConnectionError, HTTPError
import firebase_admin
from firebase_admin import firestore
import datetime
import json
import pytz

credentials = None
#with open('/hdd0/Downloads/dima-plants-d85fe39b52ba.json') as f:
#    credentials = firebase_admin.credentials.Certificate(json.load(f))

default_app = firebase_admin.initialize_app(credentials)

# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(token, message, extra=None):
    try:
        response = PushClient().publish(
            PushMessage(to=token,
                        body=message,
                        data=extra))
    except (ConnectionError, HTTPError) as exc:
        # Encountered some Connection or HTTP error - retry a few times in
        # case it is transient.
        print(exc)
        raise self.retry(exc=exc)

    try:
        # We got a response back, but we don't know whether it's an error yet.
        # This call raises errors so we can handle them with normal exception
        # flows.
        response.validate_response()
    except DeviceNotRegisteredError:
        # Mark the push token as inactive
        from notifications.models import PushToken
        PushToken.objects.filter(token=token).update(active=False)
    except PushTicketError as exc:
        # Encountered some other per-notification error.
        print(exc)
        raise self.retry(exc=exc)

def hello_world(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    db = firestore.client()
    users = [(user.id, user.to_dict()) for user in db.collection('users').stream()]
    plants = [(plant.id, plant.to_dict()) for plant in db.collection('plants').stream()]
    for (user_id, user) in users:
        print('user', user_id)
        user_plants = [(plant_id, plant) for (plant_id, plant) in plants if plant['uid'] == user_id]
        plants_in_need = []
        for (plant_id, plant) in user_plants:
            if datetime.datetime.now(pytz.utc) > plant['lastWatering'] + datetime.timedelta(seconds=plant['secondsBetweenWaterings']):
                plants_in_need.append(plant['name'])
        if len(plants_in_need) > 0 and not user.get('disableNotifications', False):
            if len(plants_in_need) > 1:
                message = f'Le piante hanno bisogno di te! Innaffia subito {", ".join(plants_in_need[:-1])} e {plants_in_need[-1]}'
            else:
                message = f'{plants_in_need[0]} ha bisogno di acqua, innaffiala subito!'
            send_push_message(user['expoToken'], message, extra=None)
            print('user', user_id, 'sent notification for', len(plants_in_need), 'plants')


#hello_world(None)
