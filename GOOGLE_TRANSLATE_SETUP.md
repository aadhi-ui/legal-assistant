# Google Translate API Integration Guide

## Setup Instructions

### 1. Get Google Translate API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Translate API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Translate API"
   - Click on it and press "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
5. (Optional) Restrict the API key:
   - Click on the API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Translate API"

### 2. Configure the Application

1. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your Google Translate API key to the `.env` file:
   ```
   REACT_APP_GOOGLE_TRANSLATE_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies

The required dependencies are already included in the project:
- `@google-cloud/translate` - Google Translate API client
- `axios` - HTTP client for API calls

## Features

### Multi-Language Support
- **13 Indian Languages**: English, Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Urdu
- **Real-time Translation**: Text is translated as users switch languages
- **Caching**: Translations are cached to improve performance and reduce API calls
- **Offline Fallback**: Predefined translations for common phrases when API is unavailable

### Translation Components

#### 1. TranslatableText Component
```jsx
import TranslatableText from './components/TranslatableText';

<TranslatableText 
  text="Hello World" 
  component="h1" 
  className="title"
/>
```

#### 2. useTranslation Hook
```jsx
import { useTranslation } from './hooks/useTranslation';

const MyComponent = () => {
  const { currentLanguage, t, tAsync, changeLanguage } = useTranslation();
  
  return (
    <div>
      <p>{t('Already translated text')}</p>
      <button onClick={() => changeLanguage('hi')}>Switch to Hindi</button>
    </div>
  );
};
```

### Translation Service Features

- **Automatic Caching**: Reduces API calls by storing translations
- **Batch Translation**: Translate multiple texts efficiently
- **Fallback System**: Uses predefined translations when API is unavailable
- **Online/Offline Detection**: Automatically switches to fallback mode when offline

## Usage Examples

### Basic Translation
```jsx
// Simple text translation
<TranslatableText text="Welcome to LegalAid India" />

// With custom component and styling
<TranslatableText 
  text="Legal Services"
  component="h2"
  className="section-title"
/>
```

### Advanced Usage
```jsx
const { translate, translateBatch, currentLanguage } = useTranslation();

// Translate single text
const translatedText = await translate('Hello', 'hi');

// Translate multiple texts
const translatedTexts = await translateBatch([
  'Home',
  'About',
  'Contact'
], 'hi');
```

## Supported Languages

| Language | Code | Native Name |
|----------|------|-------------|
| English | en | English |
| Hindi | hi | हिन्दी |
| Tamil | ta | தமிழ் |
| Bengali | bn | বাংলা |
| Telugu | te | తెలుగు |
| Marathi | mr | मराठी |
| Gujarati | gu | ગુજરાતી |
| Kannada | kn | ಕನ್ನಡ |
| Malayalam | ml | മലയാളം |
| Punjabi | pa | ਪੰਜਾਬੀ |
| Odia | or | ଓଡ଼ିଆ |
| Assamese | as | অসমীয়া |
| Urdu | ur | اردو |

## Cost Optimization

### 1. Caching Strategy
- Translations are cached in memory during the session
- Reduces redundant API calls for the same text
- Fallback translations for common phrases

### 2. Batch Processing
- Multiple texts are translated in a single API call when possible
- Reduces the number of individual requests

### 3. Fallback System
- Predefined translations for common UI elements
- Graceful degradation when API is unavailable
- No API calls for English content

## Error Handling

The translation service includes comprehensive error handling:

1. **API Key Missing**: Falls back to predefined translations
2. **Network Issues**: Uses cached or fallback translations
3. **API Quota Exceeded**: Gracefully falls back to original text
4. **Invalid Language Codes**: Returns original text

## Performance Tips

1. **Preload Common Translations**: Add frequently used phrases to fallback translations
2. **Use Batch Translation**: For multiple texts, use `translateBatch()` instead of multiple `translate()` calls
3. **Minimize Re-renders**: Use caching to avoid re-translating the same content
4. **Optimize Component Updates**: Only re-translate when language actually changes

## Troubleshooting

### Common Issues

1. **Translations not working**:
   - Check if the API key is correctly set in `.env`
   - Verify the Google Translate API is enabled in Google Cloud Console
   - Check browser console for error messages

2. **Slow translation**:
   - Enable caching (already implemented)
   - Use batch translation for multiple texts
   - Check network connectivity

3. **API quota exceeded**:
   - Monitor your API usage in Google Cloud Console
   - Implement more aggressive caching
   - Add more fallback translations

### Debug Mode

To enable debug logging, add this to your `.env`:
```
REACT_APP_DEBUG_TRANSLATIONS=true
```

This will log translation requests and responses to the browser console.

## Security Notes

- Never commit your actual API key to version control
- Use environment variables for API keys
- Consider implementing API key rotation for production
- Monitor API usage to prevent unexpected charges
- Restrict API key usage to specific domains in production
