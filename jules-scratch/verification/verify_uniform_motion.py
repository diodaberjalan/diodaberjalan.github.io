import os
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Get the absolute path to the index.html file
    file_path = os.path.abspath('index.html')

    # Navigate to the local HTML file
    page.goto(f'file://{file_path}')

    # Wait for the canvas to be present
    canvas = page.locator('#starfield')
    expect(canvas).to_be_visible()

    # Give the animation some time to run
    page.wait_for_timeout(2000) # 2 seconds

    # Take a screenshot
    screenshot_path = 'jules-scratch/verification/verification.png'
    page.screenshot(path=screenshot_path)

    browser.close()

    print(f"Screenshot saved to {screenshot_path}")

with sync_playwright() as playwright:
    run(playwright)
