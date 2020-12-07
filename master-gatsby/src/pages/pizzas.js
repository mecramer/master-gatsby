import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'

function PizzasPage({ data }) {
  console.log(data.pizzas)
  const pizzas = data.pizzas.nodes
  return (
    <>
      <PizzaList pizzas={pizzas} />
    </>
  )
}

export default PizzasPage

export const query = graphql`
  query PizzaQeury {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }

            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
