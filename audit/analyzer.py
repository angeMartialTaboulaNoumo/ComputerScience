# -*- coding: utf-8 -*-
"""
Created on Fri Dec  5 02:20:59 2025

@author: USER
"""

from fetcher import fetch_resources
import requests

def get_resource_size(url):
    try:
        head = requests.head(url, allow_redirects=True, timeout=5)
        return int(head.headers.get("Content-Length", 0))
    except:
        return 0

def analyze_page(url):
    soup, resources = fetch_resources(url)

    total_size = 0
    images = []

    for res in resources:
        size = get_resource_size(res)
        total_size += size

        if res.lower().endswith(("jpg", "jpeg", "png", "gif", "webp", "svg")):
            images.append((res, size))

    return {
        "nb_requetes": len(resources),
        "poids_total": total_size,
        "images": images
    }
