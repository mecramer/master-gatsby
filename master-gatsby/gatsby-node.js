import path from 'path'
import fetch from 'isomorphic-fetch' // fetch doesn't currently work with node natively

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js')
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `)
  // console.log(data)
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    })
  })
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // console.log(`Turning the toppings into page!!`)
  // 1. Get the template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js')
  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `)
  // 3. createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    // console.log(`Creating page for topping`, topping.name)
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO Regex for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    })
  })
  // 4. Pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // console.log('🍺 Turn Beers into Nodes!')
  // 1. Fetch a list of beers
  const response = await fetch('https://api.sampleapis.com/beers/ale')
  const beers = await response.json()
  console.log(beers)
  // 2. Loop over each one
  beers.forEach((beer) => {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    }
    // 3. Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    })
  })
}

// sourceNodes is a gatsby extension point that tells plugins to source nodes
export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API!
  await Promise.all([fetchBeersAndTurnIntoNodes(params)])
}

export async function createPages(params) {
  // create pages dynamically
  // Promise.all is a way to await multiple items at once. The second item does not need to wait for first though
  // wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ])

  // 1. Pizzas
  // 2. Toppings
  // 3. Slicemasters
}
