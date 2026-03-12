## Glaze Creator

Web configurator for Glaze prosthetics built with React and Redux.

The project has been modernized from class components to function components with hooks and updated to a current Create React App toolchain. The core wizard flow remains the same:

1. Select prosthetic side
2. Select product type
3. Personalize colors and finishing
4. Provide measurements and order details
5. Review the summary and export a PDF

## Stack

- React 17
- React Redux hooks (`useSelector`, `useDispatch`)
- Redux with plain reducers
- Sass compiled to `src/scss/main.css`
- `html2canvas` + `jsPDF` for PDF export

## Project Structure

- `src/App.js`: main wizard shell and step navigation
- `src/containers/`: step-level containers
- `src/component/`: reusable presentational components
- `src/reducers/`: Redux state for app flow, details, and personalization
- `src/selectors/`: centralized Redux selectors
- `src/helpers/generateSummaryPdf.js`: extracted PDF generation logic

## Data Flow

The configurator uses a simple unidirectional flow:

`UI event -> action creator -> reducer -> selector -> component render`

Important state slices:

- `app`: current wizard step and step metadata
- `details`: measurements, order info, side, and form validity
- `personalize`: active model, active part, hover state, colors, and finishing

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the Sass watcher and the development server in parallel.

### `npm test -- --watchAll=false`

Runs the automated test suite once.

### `npm run build`

Builds Sass and creates the production bundle in `build/`.

## Docker

The repository includes both production and development Docker setups.

### Production

Build and run the Nginx-based production image:

```bash
docker compose up --build app
```

The application will be available at `http://localhost:8080`.

To stop it:

```bash
docker compose stop app
```

### Development

Run the CRA development server and Sass watcher inside Docker:

```bash
docker compose up --build app-dev
```

The development app will be available at `http://localhost:3000`.

The development service mounts the repository into the container and keeps `node_modules` in a dedicated Docker volume, so code changes on the host are reflected in the running app.

## Testing

The current automated coverage focuses on regression-prone areas:

- reducer immutability
- wizard step boundaries
- form validation rules
- basic app render with Redux provider

## Refactoring Notes

- Reducers now use immutable updates. Keep that rule for every future change.
- Prefer selectors from `src/selectors/` over subscribing to the entire store.
- Keep PDF code outside React components. `SummaryContainer` only orchestrates the action and owns the preview `ref`.
- Add comments only where the intent is not obvious, especially around step orchestration and export logic.

## Known Follow-ups

- Sass still uses legacy `@import` and slash division syntax, which produces deprecation warnings during build.
- The folder name `src/component/` is legacy and can be renamed later if the team wants a broader cleanup pass.