import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background-color: white;
      padding: 2px 5px;
    }
    .active {
      background-color: var(--yellow);
    }
  }
`

function countPizzasIntoppings(pizzas) {
  // return the pizzas with counts
  // console.log({ pizzas })
  // 1. map through the pizzas
  // 2. reduced the multi level array to one level (flat)
  // 3. use the reduce function to keep a count of number of each type of pizza
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id]
      if (existingTopping) {
        // if it is, increment by 1
        existingTopping.count += 1
      } else {
        // otherwise create a new entry in our acc and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        }
      }
      return acc
    }, {})
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count)
  return sortedToppings
}

function ToppingsFilter() {
  // Get a list of all toppings
  // Get a list of all the pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `)
  // console.clear()
  // Count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasIntoppings(pizzas.nodes)
  // console.log(toppingsWithCounts)
  // Loop over the list of toppings and display the topping and the count of pizzas in that topping
  // Link it up...
  return (
    <ToppingStyles>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingStyles>
  )
}

export default ToppingsFilter
