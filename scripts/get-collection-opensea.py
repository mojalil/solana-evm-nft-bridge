import os
import requests
import json
import time

# import api key from .env.local file
from dotenv import load_dotenv
load_dotenv(".env.local")

# load api key OPEN_SEA_API_KEY from .env.local file and assign to api_key variable

collection_name = "foundingfrens"
url = "https://api.opensea.io/v2/collection/foundingfrens/nfts"
API_KEY = os.getenv("OPENSEA_API_KEY")


headers = {
    "X-API-KEY": API_KEY,
    "Accept": "application/json"
}


# def get_collection(collection_name):
#     # Get the collection from OpenSea

#     # try catch block
#     try:
#         url = f"https://api.opensea.io/v2/collection/{collection_name}/nfts"
#         response = requests.get(url, headers=headers)
#         data = response.json()
#         nfts = data.get("nfts", [])
#         next_token = response.json()['next']

#         while next_token:
#             response = requests.get(url,
#                                     headers=headers,
#                                     params={'next': next_token})
#             nfts.extend(response.json()['nfts'])
#             next_token = response.json().get('next', None)
#             print('Print Total number: %d NFTs', len(nfts))
#             time.sleep(5)

#             # Save the results into a JSON file incrementally
#             with open(f'{collection_name}.json', 'w') as f:
#                 json.dump(nfts, f)

#         return nfts
        
#     except Exception as e:
#         print(e)
#         print(f"Error getting collection {collection_name} from OpenSea with error {e}")
#         return


# Create function to get the collection from OpenSea. Function should be able to restart from where it left off if it fails
def get_collection(collection_name):
    next_token_file = f'{collection_name}-next-token.txt'
    url = f"https://api.opensea.io/v2/collection/{collection_name}/nfts"


    # try catch block
    try:
        # check if does not exist
        if not os.path.exists(next_token_file):
            print(f"Token doesn not exist starting from beginning")
            response = requests.get(url, headers=headers)
            data = response.json()
            nfts = data.get("nfts", [])
            next_token = response.json()['next']
        else:
            # Load next_token if it exists
            print(f"Token exists, starting from {next_token_file}")
            if os.path.exists(next_token_file):
                with open(next_token_file, 'r') as f:
                    next_token = f.read()

            # Load the nfts from the JSON file
            with open(f'{collection_name}.json', 'r') as f:
                nfts = json.load(f)


        while next_token:
            print(f"Getting {collection_name} from OpenSea with next token {next_token}")
            response = requests.get(url,
                                    headers=headers,
                                    params={'next': next_token})
            nfts.extend(response.json()['nfts'])
            next_token = response.json().get('next', None)
            print(f"Total number: {len(nfts)} NFTs")
            time.sleep(5)

            # Save the results into a JSON file incrementally
            print(f"Saving {len(nfts)} nfts")
            with open(f'{collection_name}.json', 'w') as f:
                json.dump(nfts, f)

            # Save next token to a file
            print(f"Saving next token {next_token}")
            with open(f'{collection_name}-next-token.txt', 'w') as f:
                f.write(next_token)

        return nfts
        
    except Exception as e:
        print(e.encode('utf-8'))
        print(f"Error getting collection {collection_name} from OpenSea with error {e}")
        return nfts


def main():

    # try catch block
    try:
        # Get the collection from OpenSea
        print("Getting collection from OpenSea")
        nfts = get_collection(collection_name)
    except Exception as e:
        print(e)
        print("Error getting collection from OpenSea")
        return

    # Save the results into a JSON file
    with open(f'{collection_name}-all.json', 'w') as f:
        json.dump(nfts, f)

main()