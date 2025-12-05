# -*- coding: utf-8 -*-
"""
Created on Fri Dec  5 02:21:54 2025

@author: USER
"""
import json

def save_json(data, filename="report.json"):
    with open(filename, "w") as f:
        json.dump(data, f, indent=2)
