import React from 'react'

function HomePage() {
  const [inputfieldsToAdd, setInputfieldsToAdd] = React.useState(0)

  return (
    <>
      <p>Hey! I'm A home page. I'm a really long title. I mean really long.</p>
      <p>Hey I'm another element</p>
      <p>Hey I'm another element. I'm a medium length paragraph.</p>
      <div>
        <div>
          <label>Number of fields to add</label>
          &nbsp;
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
              <p>
                stuff&nbsp;
                {index + 1}
              </p>
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomePage
