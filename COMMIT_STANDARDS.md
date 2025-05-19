# Commit Standards

## Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

## Scope
The scope should be the name of the component or feature affected (e.g., product, auth)

## Subject
- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize first letter
- No dot (.) at the end

## Examples
```
feat(cart): add ability to remove items

fix(checkout): resolve payment processing error

docs(readme): update installation instructions

style(product): format product list component

refactor(auth): simplify login logic

perf(images): optimize image loading

test(api): add unit tests for product API

chore(deps): update dependencies
```

## Best Practices

### Do's
1. Keep commits atomic and focused
2. Write clear and descriptive messages
3. Reference issues in commit body
4. Use conventional commit types
5. Include scope when relevant

### Don'ts
1. Don't mix multiple changes in one commit
2. Don't write vague messages
3. Don't skip the type prefix
4. Don't exceed 72 characters in subject line
5. Don't use past tense

## Branch Naming

### Format
```
<type>/<description>
```

### Types
- **feature**: New feature development
- **bugfix**: Bug fixes
- **hotfix**: Urgent fixes for production
- **release**: Release preparation
- **docs**: Documentation updates

### Examples
```
feature/add-cart-functionality
bugfix/fix-checkout-validation
hotfix/critical-security-patch
release/v1.2.0
docs/update-api-docs
```

## Pull Request Guidelines

### Title Format
```
[<type>] <description>
```

### Description Template
```
## Changes
- List the main changes

## Testing
- Describe testing done

## Screenshots
- Add relevant screenshots

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Code follows style guide
- [ ] Reviewed by team member
```

## Version Control Workflow

1. **Create Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes**
   - Keep commits small and focused
   - Follow commit message format

3. **Push Changes**
   ```bash
   git push origin feature/new-feature
   ```

4. **Create Pull Request**
   - Use PR template
   - Request reviews
   - Address feedback

5. **Merge**
   - Squash commits if needed
   - Delete branch after merge 