# -*- coding: utf-8 -*-
"""
Created on Fri Dec  5 02:25:00 2025

@author: USER
"""

from playwright.sync_api import sync_playwright

def coverage_analysis(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        page.coverage.start_js_coverage()
        page.coverage.start_css_coverage()

        page.goto(url)

        js_cov = page.coverage.stop_js_coverage()
        css_cov = page.coverage.stop_css_coverage()

        unused_js = sum(e["uncoveredBytes"] for e in js_cov)
        unused_css = sum(e["uncoveredBytes"] for e in css_cov)

        return {"unused_js": unused_js, "unused_css": unused_css}
