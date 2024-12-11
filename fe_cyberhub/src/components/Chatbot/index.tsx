import React, { useState, useEffect } from 'react';
import { FaRegSmile, FaTimes, FaBars, FaVolumeUp, FaUserCircle, FaComments } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import styles from './Chatbox.module.css';
import logo from '../../assets/logo1.png'; // Import your logo

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState(''); // Manage input field
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Manage sound muted state

  useEffect(() => {
    // Display the first message after 30 seconds
    const firstMessageTimer = setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'CYBERHUB đang có nhiều chương trình khuyến mãi và ưu đãi hấp dẫn. Anh/Chị có thể nhắn tin vào khung chat để được tư vấn chi tiết.',
          timestamp: 'Vừa xong',
          sender: 'admin',
        },
      ]);
    }, 30000); // 30 seconds

    // Display the second message after 1 minute 30 seconds
    const secondMessageTimer = setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Nếu anh/chị vẫn chưa chọn được sản phẩm nào phù hợp hãy nhắn vào khung chat, CYBERHUB sẵn lòng giải đáp mọi thắc mắc.',
          timestamp: 'Vừa xong',
          sender: 'admin',
        },
      ]);
    }, 90000); // 1 minute 30 seconds

    return () => {
      clearTimeout(firstMessageTimer);
      clearTimeout(secondMessageTimer);
    };
  }, []);

  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Function to handle sending a message
  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: inputValue,
          timestamp: 'Vừa xong',
          sender: 'user',
        },
      ]);
      setInputValue(''); // Clear the input field
    }
  };

  // Function to handle adding emoji to input field
  const addEmoji = (emoji) => {
    setInputValue((prevInput) => prevInput + emoji.native); // Append emoji to input field
  };

  // Handle sound mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const closeChatbox = () => {
    setIsChatVisible(false);
    setShowDropdown(false);
  };

  const reopenChatbox = () => setIsChatVisible(true);

  return (
    <>
      {isChatVisible ? (
        <div className={`${styles.chatbox} ${isChatVisible ? styles.show : styles.hide}`}>
          {/* Header */}
          <div className={styles.chatboxHeader}>
            <div className={styles.headerLeft}>
              <img src={logo} alt="Logo" className={styles.logo} />
              <div className={styles.headerText}>
                <div className={styles.mainTitle}>CyberHub</div>
                <div className={styles.subTitle}>Chat với chúng tôi</div>
              </div>
            </div>
            <div>
              <FaBars className={styles.hamburger} onClick={toggleDropdown} />
              <FaTimes className={styles.closeButton} onClick={closeChatbox} />
            </div>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem} onClick={toggleMute}>
                <FaVolumeUp />
                {isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              </div>
              <div className={styles.dropdownItem}>
                <FaUserCircle />
                Profile
              </div>
            </div>
          )}

          {/* Chat Content */}
          <div className={styles.chatboxContent}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === 'admin' ? styles.adminMessageContainer : styles.userMessageContainer
                }
              >
                {message.sender === 'admin' ? (
                  <img src={logo} alt="Logo" className={styles.messageLogo} />
                ) : (
                  <FaUserCircle className={styles.messageUserIcon} />
                )}
                <div className={styles.messageBubble}>
                  {message.text}
                  <div className={styles.timestamp}>
                    {message.sender === 'admin' ? 'CyberHub · ' : 'Khách hàng · '}
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input and Emoji Section */}
          <div className={styles.chatboxFooter}>
            <FaRegSmile onClick={toggleEmojiPicker} className={styles.emojiIcon} />
            {showEmojiPicker && (
              <div className={styles.emojiPicker}>
                <Picker onEmojiSelect={addEmoji} />
              </div>
            )}
            <input
              className={styles.input}
              type="text"
              placeholder="Nhập nội dung..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className={styles.sendButton} onClick={sendMessage}>
              Gửi
            </button>
          </div>
        </div>
      ) : (
        <div className={`${styles.chatBar} ${isChatVisible ? styles.hide : styles.show}`} onClick={reopenChatbox}>
          <FaComments className={styles.chatBarIcon} />
          <span>Chat tư vấn - Giải đáp mọi thắc mắc</span>
        </div>
      )}
    </>
  );
};

export default Chatbox;
