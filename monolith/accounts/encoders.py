from common.json import ModelEncoder
from django.utils import timezone
from .models import User


class AccountModelEncoder(ModelEncoder):
    model = User
    properties = ["email", "first_name", "last_name"]


class AccountInfoModelEncoder(ModelEncoder):
    model = User
    properties = ["email", "first_name", "last_name", "is_active"]

    def get_extra_data(self, o):
        return {"updated": timezone.now()}
