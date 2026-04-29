import os
import re

def html_to_jsx(html):
    # Extract body content
    match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
    if not match:
        return ""
    content = match.group(1)
    
    # Remove script and style tags from inside body if any
    content = re.sub(r'<script.*?>.*?</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<style.*?>.*?</style>', '', content, flags=re.DOTALL)
    
    # Convert HTML comments to JSX comments
    content = re.sub(r'<!--\s*(.*?)\s*-->', r'{/* \1 */}', content)
    
    # Convert class to className
    content = re.sub(r'\bclass=', 'className=', content)
    
    # Convert for to htmlFor
    content = re.sub(r'\bfor=', 'htmlFor=', content)
    
    # Self-close specific tags
    for tag in ['img', 'input', 'hr', 'br']:
        content = re.sub(r'<(%s[^>]*)(?<!/)>' % tag, r'<\1 />', content, flags=re.IGNORECASE)
    
    # Convert style="xyz: abc;" to style={{xyz: 'abc'}}
    def style_replacer(m):
        style_str = m.group(1)
        styles = []
        for prop in style_str.split(';'):
            if ':' not in prop:
                continue
            k, v = prop.split(':', 1)
            k = k.strip()
            v = v.strip().replace("'", "\\'")
            # camelCase the key
            k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            styles.append(f"{k}: '{v}'")
        return 'style={{' + ', '.join(styles) + '}}'
    
    content = re.sub(r'style="([^"]*)"', style_replacer, content)
    
    # Escape curly braces in text content (between > and <)
    # This finds text segments between tags and escapes { and } that are not
    # already part of JSX expressions
    def escape_braces_in_text(m):
        text = m.group(1)
        # Skip if it's exactly a JSX comment or contains one (simple heuristic for this app)
        if '{/*' in text and '*/}' in text:
            # We need to be more careful if there's text around the comment
            # For this app, comments are usually lone blocks.
            # But let's try a slightly better way: only escape braces not in comments.
            parts = re.split(r'(\{\/\*.*?\*\/})', text)
            new_parts = []
            for p in parts:
                if p.startswith('{/*') and p.endswith('*/}'):
                    new_parts.append(p)
                else:
                    # Escape braces carefully using safe placeholders
                    escaped = p.replace('{', '___OPEN___').replace('}', '___CLOSE___')
                    escaped = escaped.replace('___OPEN___', "{'{'}").replace('___CLOSE___', "{'}'}")
                    new_parts.append(escaped)
            return '>' + ''.join(new_parts) + '<'
            
        # Unconditionally escape all { and } in text content carefully
        text = text.replace('{', '___OPEN___').replace('}', '___CLOSE___')
        text = text.replace('___OPEN___', "{'{'}").replace('___CLOSE___', "{'}'}")
        return '>' + text + '<'
    
    content = re.sub(r'>([^<]+)<', escape_braces_in_text, content)
    
    return content.strip()

# Read files
with open('landing_light.html', 'r', encoding='utf-8') as f:
    landing_light = html_to_jsx(f.read())
with open('landing_dark.html', 'r', encoding='utf-8') as f:
    landing_dark = html_to_jsx(f.read())
with open('app_light.html', 'r', encoding='utf-8') as f:
    app_light = html_to_jsx(f.read())
with open('app_dark.html', 'r', encoding='utf-8') as f:
    app_dark = html_to_jsx(f.read())

# Ensure we have a div wrapper if there are multiple root elements
def extract_body_class(html):
    match = re.search(r'<body[^>]*class="([^"]*)"', html, re.IGNORECASE)
    return match.group(1) if match else ''

landing_light_wrapper = extract_body_class(open('landing_light.html', 'r', encoding='utf-8').read())
landing_dark_wrapper = extract_body_class(open('landing_dark.html', 'r', encoding='utf-8').read())
app_light_wrapper = extract_body_class(open('app_light.html', 'r', encoding='utf-8').read())
app_dark_wrapper = extract_body_class(open('app_dark.html', 'r', encoding='utf-8').read())


landing_template = """import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

export default function LandingPage() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const onToggleTheme = () => {
        toggleTheme();
    };

    if (theme === 'dark') {
        return (
            <div className="%s">
                %s
            </div>
        );
    }

    return (
        <div className="%s">
            %s
        </div>
    );
}
"""

app_template = """import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

export default function Challenge() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const onToggleTheme = () => {
        toggleTheme();
    };

    if (theme === 'dark') {
        return (
            <div className="%s">
                %s
            </div>
        );
    }

    return (
        <div className="%s">
            %s
        </div>
    );
}
"""

with open('frontend/src/pages/LandingPage.jsx', 'w', encoding='utf-8') as f:
    ld = landing_dark
    ll = landing_light
    f.write(landing_template % (landing_dark_wrapper, ld, landing_light_wrapper, ll))

with open('frontend/src/pages/Challenge.jsx', 'w', encoding='utf-8') as f:
    ad = app_dark
    al = app_light
    f.write(app_template % (app_dark_wrapper, ad, app_light_wrapper, al))

print("Conversion complete.")
