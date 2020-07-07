# React + Redux dashboard
This is an simple app which fetches and displays data about cryptocurrencies. User can select any coin and one of three currencies (USD, EUR, PLN) to modify visible values. Data are fetched from [CryptoCompare](https://www.cryptocompare.com/api#) public API.

[Live Demo](https://dariuszgala.github.io/react-redux-dashboard/)

### Setup: 
Instalation of required packages can be perform using npm package manager with a module bundler like Webpack or Yarn
```
npm install
```
```
yarn install
```

To launch app locally you need to type (there is no need to open browser, it will be opened automatically):
```
npm start
```
```
yarn start
```

Launching tests can be done by command (adding `--coverage` flag will print coverage table):
```
npm run test
```
```
yarn test
```

Bundle creation is triggered by:
```
npm run build
```
```
yarn build
```

### Project description:
To create interactive application based on React/Redux basics I focused on cryptocurrencies - this is very popular topic recently and CryptoCompare provides very good API with big amount of data. Design of app is very simple - user can select any cryptocurrency from the dataset and 'standard' currency to compare and express prices, then basic informations are displayed with additional line chart with historical data. If user choose currency and change cryptocurrency, currency will not be changed. There are three types of request required to fetch all needed data: at the beginig initial data is fetched to get basic informations about all available cryptocurrencies (symbol, full name, algorithm, image, link). Then first cryptocurrency of the list is set as initial and price data of that cryptocurrency is fetched (it contains informations about current price expressed in USD, EUR and PLN currencies). As initial currency USD is set and then historical data are fetched which contains close values from previous day. If user changes cryptocurrency, fetching price and historical data is performed, but if user changes currency, only historical data need to be fetched.

### Technical details:
* **Development**: For boundling I use Webpack which is very popular and I use it in my regular development process. I also like using ESLint/TSLint linters which checks if code have syntactic errors. For JavaScript code I like using TypeScript (interfaces, typing). For transpiling TS/TSX files and ES6 features I use Babel.
* **Styles**: For styling I choosed Sass preprocessor and Bulma CSS framework. I have experience working with Sass and I very like it - using nesting, mixins, variables and other features can very simplify writing styles. I discovered Bulma recently and I very like this framework which provides layout based on flexbox and large number of very good components, and is also very light because there are only styles witohut JS scripts. Dropdown icons are get from FontAwesome library.
* **JavaScript libraries**: Basic library which is used in this app is React - it allows to create user interfaces based on components where dataflow can be performed based on components state. Very helpfull in managing components state is Redux library. To connect React with Redux 'react-redux' package is used - Provider is used to provide Redux store, and connect function which maps Redux state and dispatch functions to the app props. To use React with Redux effectively I chooseed to organize files in specific structure: React components are devided in to Components and Containers - Containers are 'smart' which means that they are connected to the Redux state and they can change this state by dispatching actions. In the other hand Components are 'dumb' - they have not any information about state and they recieve all data as props. In this project only App is an container - it fetches data and pass it down as props to the components. Redux reducers are in reducers folder and actions in actions folder. Thanks to that code is easy to maintain, update and change. To fetch data asynchronously I chooseed Axios - I like it because it is Promise based client. Using axios in dispatch actions causes that specific middleware need to be used in Redux store to handle asynchronous actions. I decidded to use thunk middleware because it is more intuitive to me than promiseMiddleware from 'redux-promise' (I am additionally using logger middleware to log any changes in the state to the console).
* **Testing**: To write unit tests I choosed Jest which is the most recomended for testing React. To be able testing Redux with React I used 'redux-mock-store' package to configure mock store and 'moxios' to mock axios requests. Components are tested using Enzyme which wraps rendered components and makes easy to manipulate and traverse it. NOTE: actionCreators test is in .jsx file bacause I had Type Error after importing configureStore function and I can't find any solution to this problem.
* **Additional**: A line chart is created using Highcharts library, the advantage of which is that the entire graph is not redrawn after the data change, but only the series. In addition I use Lodash which I very like - it provides a lot of very useful functions.
