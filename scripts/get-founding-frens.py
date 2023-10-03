import requests
import json
import time

# import api key from .env.local file
from dotenv import load_dotenv
load_dotenv(".env.local")

# load api key OPEN_SEA_API_KEY from .env.local file and assign to api_key variable
import os


url = "https://api.opensea.io/v2/collection/foundingfrens/nfts"
api_key = os.getenv("OPENSEA_API_KEY")
limit = 50
offset = 25

headers = {
    "X-API-KEY": api_key,
    "Accept": "application/json"
} 

all_nfts = []

while True:
    response = requests.get(url, params={"limit": limit, "offset": offset}, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to retrieve data: {response.content}")
        break

    data = response.json()
    nfts = data.get("nfts", [])
    
    if not nfts:
        break

    # Save the nfts in a json file per page
    # with open(f'foundingfrencollection-{offset}.json', 'w') as f:
    #     json.dump(nfts, f)

    # offset += limit

    # Add a throttle to avoid hitting the rate limit of the API, define 
    time.sleep(5)
    
    all_nfts.extend(nfts)
    # increment offset by 1 page
    offset += 1
    
    # Print the number of nfts retrieved and current progress
    print(f"Retrieved page {offset} nfts, total: {len(all_nfts)}")

    # incrementally save the results into a JSON file, make sure not have duplicate results
    with open('foundingfrencollection-pages.json', 'w') as f:
        json.dump(all_nfts, f)

    print(f"Saved {len(all_nfts)} nfts")

# Save the results into a JSON file
# with open('foundingfrencollection.json', 'w') as f:
#     json.dump(all_nfts, f)
