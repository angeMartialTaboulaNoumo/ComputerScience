# -*- coding: utf-8 -*-
"""
Created on Fri Dec  5 02:21:42 2025

@author: USER
"""

import subprocess
import json

def lighthouse_report(url):
    subprocess.run(
        f"lighthouse {url} --quiet --chrome-flags='--headless' --output=json --output-path=lh.json",
        shell=True
    )
    try:
        with open("lh.json") as f:
            return json.load(f)
    except FileNotFoundError:
        return None
