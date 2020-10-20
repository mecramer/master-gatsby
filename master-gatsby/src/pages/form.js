import React, { useEffect, useState } from 'react'

function Form() {
  const [SNNetworkChecked, setSNNetworkChecked] = useState(false)
  const [SNNetworkChecked2, setSNNetworkChecked2] = useState(false)
  const [NENNetworkChecked, setNENNetworkChecked] = useState(false)
  const [NENNetworkChecked2, setNENNetworkChecked2] = useState(false)
  const [Network, setNetwork] = useState([])

  const handleSNNetwork = (evt) => {
    const val = evt.target.checked
    return val === true ? setSNNetworkChecked(true) : setSNNetworkChecked(false)
  }
  const handleSNNetwork2 = (evt) => {
    const val = evt.target.checked
    return val === true
      ? setSNNetworkChecked2(true)
      : setSNNetworkChecked2(false)
  }
  const handleNENNetwork = (evt) => {
    const val = evt.target.checked
    return val === true
      ? setNENNetworkChecked(true)
      : setNENNetworkChecked(false)
  }
  const handleNENNetwork2 = (evt) => {
    const val = evt.target.checked
    return val === true
      ? setNENNetworkChecked2(true)
      : setNENNetworkChecked2(false)
  }

  useEffect(() => {
    if (SNNetworkChecked || SNNetworkChecked2) {
      if (Network.indexOf('SN') === -1) {
        const newArray = Network.concat('SN')
        newArray.sort()
        setNetwork(newArray)
        console.log('Adding because SN is not there already')
      }
    } else {
      console.log('Now they are all false')
      const restultingArray = Network.filter((el) => el !== 'SN')
      restultingArray.sort()
      setNetwork(restultingArray)
    }
  }, [SNNetworkChecked, SNNetworkChecked2])

  useEffect(() => {
    if (NENNetworkChecked || NENNetworkChecked2) {
      if (Network.indexOf('NEN') === -1) {
        const newArray = Network.concat('NEN')
        newArray.sort()
        setNetwork(newArray)
        console.log('Adding because NEN is not there already')
      }
    } else {
      console.log('Now they are all false')
      const restultingArray = Network.filter((el) => el !== 'NEN')
      restultingArray.sort()
      setNetwork(restultingArray)
    }
  }, [NENNetworkChecked, NENNetworkChecked2])

  return (
    <>
      <form>
        <label htmlFor="SNNetwork">
          SN Network 1
          <input name="SNNetwork" type="checkbox" onChange={handleSNNetwork} />
        </label>
        <br />
        <label htmlFor="SNNetwork2">
          SN Network 2
          <input
            name="SNNetwork2"
            type="checkbox"
            onChange={handleSNNetwork2}
          />
        </label>
        <br />
        <label htmlFor="NENNetwork">
          NEN Network 1
          <input
            name="NENNetwork"
            type="checkbox"
            onChange={handleNENNetwork}
          />
        </label>
        <br />
        <label htmlFor="NENNetwork2">
          NEN Network 2
          <input
            name="NENNetwork2"
            type="checkbox"
            onChange={handleNENNetwork2}
          />
        </label>
        <br />
      </form>
      {(SNNetworkChecked || SNNetworkChecked2) && (
        <h1>Hey, at least one of the SN boxes is checked</h1>
      )}
      {Network.map((network) => (
        <>
          <h2>
            I'm the section for&nbsp;
            {network}
          </h2>
          <p>
            Here is some stuff about&nbsp;
            {network}
          </p>
        </>
      ))}
    </>
  )
}

export default Form
