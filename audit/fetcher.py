# -*- coding: utf-8 -*-
"""
Created on Fri Dec  5 02:19:46 2025

@author: USER
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def fetch_resources(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "html.parser")

    resources = []

    for img in soup.find_all("img"):
        src = img.get("src")
        if src:
            resources.append(urljoin(url, src))

    for tag in soup.find_all(["script", "link"]):
        src = tag.get("src") or tag.get("href")
        if src:
            resources.append(urljoin(url, src))

    return soup, set(resources)
