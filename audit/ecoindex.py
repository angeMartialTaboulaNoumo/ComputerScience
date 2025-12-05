# -*- coding: utf-8 -*-
"""
Created on Fri Dec  5 02:21:14 2025

@author: USER
"""

import requests

def ecoindex_score(url):
    res = requests.get("https://api.ecoindex.fr/ecoindex", params={"url": url})
    if res.ok:
        return res.json()
    return None
