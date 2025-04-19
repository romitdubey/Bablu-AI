from desktop_use import DesktopUseClient, Locator, ApiError, sleep, ElementResponse
# import other response models or exceptions as needed

client = DesktopUseClient() # connects to default 127.0.0.1:3000
# client = DesktopUseClient(base_url='127.0.0.1:3001') # or specify host:port

def launch_apps():
    try:
        # open windows calculator
        print('opening calculator...')
        client.open_application('calc')
        print('calculator opened.')

        # wait a bit
        sleep(1000)

        # open notepad
        print('opening notepad...')
        client.open_application('notepad')
        print('notepad opened.')

        # open a url
        print('opening url...')
        client.open_url('https://github.com/mediar-ai/terminator')
        print('url opened.')

    except ApiError as e:
        print(f'api error (status: {e.status}): {e}')
    except Exception as e:
        print(f'an unexpected error occurred: {e}')

launch_apps()