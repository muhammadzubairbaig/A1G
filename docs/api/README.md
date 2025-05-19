# API Documentation

## Overview
The application uses a RESTful API for product and order management. All API endpoints are prefixed with `/api`.

## Base URL
- Development: `http://localhost:3001`

## Authentication
Currently, the API is public and doesn't require authentication.

## Endpoints

### Products

#### Get Products
```http
GET /api/storage
```

Response:
```json
{
  "products": [
    {
      "name": "string",
      "price": "number",
      "quantity": "string",
    }
  ]
}
```

### Orders

#### Create Order
```http
POST /api/orders
```

Request Body:
```json
{
  "items": [
    {
      "name": "string",
      "quantity": "number"
    }
  ],
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

### Common Error Codes
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error


## API Integration

### Using React Query
```typescript
// Example of fetching products
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts
});

// Example of creating an order
const mutation = useMutation({
  mutationFn: createOrder,
  onSuccess: handleOrderSuccess
});
```

## Best Practices

### Error Handling
```typescript
try {
  const response = await api.get('/storage');
  return response.data;
} catch (error) {
  if (error.response?.status === 404) {
    throw new Error('Products not found');
  }
  throw new Error('Failed to fetch products');
}
```

### Request Caching
- Use React Query's built-in caching
- Implement proper cache invalidation
- Set appropriate stale times

### Performance
- Implement request debouncing
- Use proper error boundaries
- Handle loading states

## Testing

### API Mocking
```typescript
// Example of mocking API calls in tests
vi.mock('../api', () => ({
  fetchProducts: vi.fn()
}));
```

### Integration Tests
```typescript
test('fetches products successfully', async () => {
  render(<ProductList />);
  await waitFor(() => {
    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });
});
```

## Development Tools

### API Client Setup
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
});
```

### Environment Variables
```env
VITE_API_URL=http://localhost:3001
VITE_API_TIMEOUT=5000
```

## Deployment Considerations

### CORS Configuration
- Ensure proper CORS headers
- Handle preflight requests
- Set appropriate origins

### Security
- Validate input data
- Sanitize responses
- Implement rate limiting

### Monitoring
- Log API errors
- Track response times
- Monitor usage patterns 