from dotenv import load_dotenv
import os


load_dotenv()
def get_env(key:str):
    data: str = os.environ.get(key)
    if not data:
        raise KeyError(f'Key {key} is not found')

    return data