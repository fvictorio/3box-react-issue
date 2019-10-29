import React, { useEffect, useState} from 'react';
import ThreeBoxCommentsReact from '3box-comments-react'
import Web3 from 'web3'

function App() {
  const [box, setBox] = useState(null)
  const [currentUserAddress, setCurrentUserAddress] = useState('')

  useEffect(() => {
    const handle3boxLogin = async () => {
      await window.ethereum.enable()
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      setCurrentUserAddress(accounts[0])
      debugger
      const newBox = await window.Box.openBox(accounts[0], web3.currentProvider)
      await newBox.openSpace('test')

      newBox.onSyncDone(() => {
        setBox(newBox)
      })
    }

    handle3boxLogin()
  }, [])

  if (!box || !currentUserAddress) {
    return null
  }

  return (
    <div>
      <h1>Comments</h1>
      <ThreeBoxCommentsReact
        adminEthAddr='0x0000000000000000000000000000000000000000'
        box={box}
        currentUserAddr={currentUserAddress}
        showCommentCount={10}
        spaceName='test'
        threadName='test'
        useHovers={false}
      />
    </div>
  )
}

export default App;
