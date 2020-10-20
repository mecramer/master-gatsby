import React from 'react'

function HomePage() {
  const [inputfieldsToAdd, setInputfieldsToAdd] = React.useState(0)

  return (
    <>
      <p>Hey! I'm the home page.</p>
      <p>Hey I'm another element</p>
      <div>
        <div>
          <label>Number of fields to add</label>
          <input
            type="number"
            onChange={(e) =>
              setInputfieldsToAdd(parseInt(e.currentTarget.value, 10))}
          />
        </div>

        {/* {fields} */}
        {[...Array(inputfieldsToAdd)].map((value, index) => (
          <div id={index}>
            <p>
              <h1>
                stuff&nbsp;
                {index + 1}
              </h1>
              <strong>
                stuff&nbsp;
                {index + 1}
              </strong>
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomePage
