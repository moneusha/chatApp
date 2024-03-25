import React, {useState} from 'react'

import Picker from 'emoji-picker-react'

import './index.css'

const userlist = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']

const ChatApp = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')

  const [showPicker, setShowPicker] = useState(false)

  const addEmoji = e => {
    const sym = e.unified.split('_')
    const codeArray = []
    sym.forEach(el => codeArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codeArray)
    setInputMessage(inputMessage + emoji)
  }
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return

    const randomUser = userlist[Math.floor(Math.random() * userlist.length)]
    const newMessage = {
      user: randomUser,
      text: inputMessage,
      likes: 0,
    }

    setMessages([...messages, newMessage])
    setInputMessage('')
  }

  const handleLike = index => {
    const updatedMessages = [...messages]
    updatedMessages[index].likes += 1
    setMessages(updatedMessages)
  }

  return (
    <div>
      <div className="messages">
        {messages.map((message, index) => (
          <div className="message">
            <span className="username">{message.user}</span>: {message.text}
            <button onClick={() => handleLike(index)}>Like</button>
            <span className="likes">{message.likes}</span>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <span>
          <img
            className="emoji-icon"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker(val => !val)}
          />
        </span>

        {showPicker && (
          <Picker pickerStyle={{width: '100%'}} onEmojiClick={addEmoji} />
        )}
      </div>
      <div>
        <button className="button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatApp
