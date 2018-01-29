# React/Redux interactive app
This is an simple app which fetches and displays data about cryptocurrencies. User can select any coin and one of three currencies (USD, EUR, PLN) to modify visible values. Data are fetched from [CryptoCompare](https://www.cryptocompare.com/api#) public API.

### Setup: 
Instalation of required packages can be perform using npm package manager with a module bundler like Webpack or Browserify
```
npm install
```

To launch app locally you need to type (there is no need to open browser, it will be open automatically):
```
npm start
```

Launching tests can be done by command:
```
npm run test
```

Additionally if preparing to the deployment is needed you can minify app by typing:
```
npm run build
```

### Project description:
To create interactive application based on React/Redux basics I focused on cryptocurrencies - this is very popular topic recently and CryptoCompare provides very good API with big amount of data. Design of app is very simple - user can select any cryptocurrency from the dataset and 'standard' currency to compare and express prices, then basic informations are displayed with additional line chart with historical data. If user choose currency and change cryptocurrency, currency will not be changed. There are three types of request required to fetch all needed data: at the beginig initial data is fetched to get basic informations about all available cryptocurrencies (symbol, full name, algorithm, image, link). Then first cryptocurrency of the list is set as initial and price data of that cryptocurrency is fetched (it contains informations about current price expressed in USD, EUR and PLN currencies). As initial currency 'USD is set and then historical data is fetched which contains close values from previous day. If user changes cryptocurrency, fetching price and historical data is performed, but if user changes currency, only historical data need to be fetched.

### Technical details:
* **Development**: For boundling I am using Webpack which is very popular and which I am using in my regular development process. I also like using ESLint/TSLint linters which checks if my code if code have syntactic errors. For JavaScript code I like using TypeScript (interfaces, typing). For transpiling TypeScript files and ES6 features I am using Babel.
* **Styles**: For styling I choosed Sass preprocessor and Bulma CSS framework. I have experience in working with Sass and I very like it - using nesting, mixins, variables and other features can very simplify writing styles. I discovered Bulma recently and I very like this framework which provides layout based on flexbox and large number of very good components, additionally it is very light because there are only styles witohut JS scripts. Dropdown icons are get from FontAwesome library
* **JavaScript libraries**: Basic library which is used in this app is React - it allows to create user interfaces based on components where dataflow can be performed based on components state. Very helpfull in managing components state is Redux library. To connect React with Redux 'react-redux' package is used - Provider element can be used to provide Redux store, and connect function which maps Redux state and dispatch functions to the app props. To use React with Redux effectively I choose to organize files in specific structure: React components are devided in to Components and Containers - Containers are 'smart' which means that they are connected to the Redux state and they can change this state by dispatching actions. In the other hand Components are 'dumb' - they have any information about state and they recieve all data as props. In this project only App is an container - it fetches data and pass it down as props to the components. Redux reducers are in reducers folder and actions in actions folder. To increase redundancy action types are moved to the separated file. With that structure code is easy to maintain, update and change. To fetch data asynchronously I choose Axios - I like it because it is Promise based. Using axios in dispatch actions causes that specific middleware need to be used in Redux store to handle asynchronous actions. I choose thunk middleware because it is more intuitive to me than promiseMiddleware from 'redux-promise' (I am additionally using logger middleware to log any changes in the state to the console).
* **Testing**: To write unit tests i chose Jest which is the most recomended for testing React. To be able testing Redux with React I choose 'redux-mock-store' package to configure mock store and 'moxios' to mock axios requests. Components are tested using Enzyme which wraps rendered components and makes easy to manipulate and traverse it. NOTE: actionCreators test is in .jsx file bacause I have Type Error after importing configureStore function and I cannot find any solution to this problem
* **Additional**: Line chart is created using Highcharts library which adventage is that whole chart is not redrawn after change of data but only series. Additionally I am using Lodash which I very like - it provides a lot of very useful functions

### Pros and cons:
* **Pros**: 
  * Using Redux makes working with state very simple - maybye in small project like this it could not be seen but in larger projects Redux shines
  * Asynchronously loaded data does not freezes app when running and user can be notified if data is fetching by adding spinner icons
  * User can select cryptocurrency and currency without changing each other
  * Every data is fetched by one generic action

* **Cons**:
  * Cryptocurrency select field should have search option because now there are only option to scroll in the dropdown or type first letter
  * Small number of interactive elements
  * No option to compare cryptocurrencies between each other, no interaction with chart
  * Loaded earlier price and historical data is not stored and in each time data need to be fetched again

### Future improvements:
In the future app can be improved by adding more functionality and interactive elements. To do that more 'smart' components and reducers should be added. There is consideration about refactoring actions witch fetchs price and historical data. But main improvement to me is creating functionality that stores previously loaded data  - in each time that user selects previous cryptocurrency or currency, data should be loaded from store and shouldn't be fetched from API - that could improve performance