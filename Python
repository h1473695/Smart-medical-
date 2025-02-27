import requests
from bs4 import BeautifulSoup

def scrape_google(symptom):
    search_url = f"https://www.google.com/search?q={symptom}+রোগ+প্রতিকার"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    results = soup.find_all("h3")  # Google search result titles
    info = [result.get_text() for result in results[:5]]
    
    return info if info else ["তথ্য পাওয়া যায়নি।"]

symptom = "জ্বর"
print(scrape_google(symptom))
