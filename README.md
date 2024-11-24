# Ghumakkad - Travel Planner

**Ghumakkad** is a web application designed to make trip planning easier by offering several useful features, including an itinerary builder, packing list generator, travel suggestions, budget estimator, and weather forecasting. The platform is built with a clean, intuitive user interface, making it easy for users to organize and manage their travel plans.

## Features

- **Itinerary Builder**: Users can create detailed itineraries with activities, dates, and locations for their trips.
- **Packing List Generator**: Automatically generates a packing list based on the user's destination, duration of the trip, and other factors.
- **Travel Suggestions**: Get travel suggestions based on your interests, time, and location.
- **Budget Estimator**: Estimate the budget for your trip based on the activities and destinations you plan to visit.
- **Weather Forecast**: Provides weather updates and forecasts for your destination to help you pack accordingly.

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces, particularly single-page applications.
- **Styled Components**: Utilized for writing plain CSS in JavaScript, which provides a more maintainable and scoped styling approach.
- **React Router**: A standard library for routing in React, which enables navigation between different pages (Home, Itinerary, Packing List, etc.).
- **Axios**: For making HTTP requests to third-party APIs (for weather and travel suggestions).


### Additional Libraries

- **React Icons**: Used to enhance the UI with vector icons.
- **Chart.js**: A library used for visualizing budget estimates in graphical formats.
- **Weather APIs**: Integrated third-party weather services to show live weather forecasts for travel destinations.
  
## Special Features

### 1. **Dynamic Itinerary Builder**
   - Users can customize their trip by adding activities, selecting dates, and entering destinations. The itinerary is fully editable and responsive.
   - The app auto-adjusts dates and timelines based on user input, ensuring seamless planning.

### 2. **Responsive Design**
   - The project is fully responsive across all devices. The navbar adjusts for mobile screens, with a hamburger menu for easy navigation.
   - The app’s layout and elements automatically adapt to different screen sizes, providing a smooth user experience on desktops, tablets, and mobile devices.

### 3. **Real-Time Weather Forecast**
   - The weather feature pulls real-time data from a weather API to show the weather conditions at the user’s destination, helping them pack appropriately.
   - Includes a user-friendly interface showing temperature, humidity, and weather predictions.

### 4. **Interactive Packing List**
   - Based on the trip’s details (duration, destination, activities), the app generates a suggested packing list, helping users stay organized.
   - Users can mark items as packed and add custom items to their lists.

### 5. **Budget Estimator with Visuals**
   - Users can input their planned activities and destinations, and the app provides a budget estimate. 
   - Visual graphs display the budget distribution, showing users how their funds will be allocated (transportation, accommodation, activities, etc.).
     
## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ghumakkad.git
cd ghumakkad
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

To start the development server:

```bash
npm start
```

Visit `http://localhost:3000` in your browser to view the app.

---

## Contributing

Feel free to fork this repository and contribute. If you have any ideas for new features or improvements, create an issue or submit a pull request.

1. Fork the repo.
2. Create a branch for your feature.
3. Commit your changes.
4. Push to your fork.
5. Open a pull request.

### Key Sections Explained:

1. **Features**: This section provides an overview of all the key functionalities your app offers. It can include additional features if needed.
2. **Tech Stack**: Explains the technologies used to build the application, including both frontend and backend tools, and any external libraries or APIs integrated.
3. **Special Features**: Highlights unique functionalities that set your app apart, such as the dynamic itinerary builder, responsive design, and budget estimator with visualizations.
4. **Installation**: A quick setup guide to help users or developers clone and run your project locally.
5. **Contributing**: Instructions on how others can contribute to the project, along with guidelines for forking and submitting pull requests.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
