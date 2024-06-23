// SignIn.tsx
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledInput } from '../components'

export const SignIn: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordAgain, setPasswordAgain] = useState<string>('')
  
  const [emailError, setEmailError] = useState<string>('')
  const [nicknameError, setNicknameError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [passwordAgainError, setPasswordAgainError] = useState<string>('')

  const onEmailChange = (value: string) => setEmail(value)
  const onNicknameChange = (value: string) => setNickname(value)
  const onPasswordChange = (value: string) => setPassword(value)
  const onPasswordAgainChange = (value: string) => setPasswordAgain(value)

  const handleSignIn = () => {
    let hasError = false
    setEmailError('')
    setNicknameError('')
    setPasswordError('')
    setPasswordAgainError('')

    if (email.trim() === '') {
      setEmailError('此欄位不可為空')
      hasError = true
    }
    if (nickname.trim() === '') {
      setNicknameError('此欄位不可為空')
      hasError = true
    }
    if (password.trim() === '') {
      setPasswordError('此欄位不可為空')
      hasError = true
    }
    if (passwordAgain.trim() === '') {
      setPasswordAgainError('此欄位不可為空')
      hasError = true
    }

    if (hasError) return

    axios.post('/users/sign_up', {
      email,
      password,
      nickname
    }, {
      baseURL: 'https://todolist-api.hexschool.io/',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        if (response.data.status) {
          navigate('/log_in')
        } else {
          console.error('Error:', response.data.message)
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  return (
    <>
      <h2 className='auth_title signIn_title'>註冊帳號</h2>
      <StyledInput
        id='email'
        label='Email'
        type='email'
        value={email}
        placeholder='請輸入 Email'
        errorMessage={emailError}
        onChange={onEmailChange}
      />
      <StyledInput
        id='nickname'
        label='您的暱稱'
        type='text'
        value={nickname}
        placeholder='請輸入您的暱稱'
        errorMessage={nicknameError}
        onChange={onNicknameChange}
      />
      <StyledInput
        id='password'
        label='密碼'
        type='password'
        value={password}
        placeholder='請輸入密碼'
        errorMessage={passwordError}
        onChange={onPasswordChange}
      />
      <StyledInput
        id='passwordAgain'
        label='再次輸入密碼'
        type='password'
        value={passwordAgain}
        placeholder='請再次輸入密碼'
        errorMessage={passwordAgainError}
        onChange={onPasswordAgainChange}
      />
      <div className='button_group'>
        <div>
          <button
            name='sign_in'
            type='submit'
            className='button_primary'
            onClick={handleSignIn}
          >註冊帳號</button>
        </div>
        <div>
          <button
            type='button'
            className='button_secondary'
            onClick={() => navigate('/log_in')}
          >登入</button>
        </div>
      </div>
    </>
  )
}