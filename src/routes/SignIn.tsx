// SignIn.tsx
import React, { useState } from 'react'
import { StyledInput } from '../components'
import { useNavigate } from 'react-router-dom'

export const SignIn: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [nickName, setNickName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordAgain, setPasswordAgain] = useState<string>('')
  
  const [emailError, setEmailError] = useState<string>('')
  const [nickNameError, setNickNameError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [passwordAgainError, setPasswordAgainError] = useState<string>('')

  const onEmailChange = (value: string) => setEmail(value)
  const onNickNameChange = (value: string) => setNickName(value)
  const onPasswordChange = (value: string) => setPassword(value)
  const onPasswordAgainChange = (value: string) => setPasswordAgain(value)

  const handleLogin = () => {
    let hasError = false
    setEmailError('')
    setNickNameError('')
    setPasswordError('')
    setPasswordAgainError('')

    if (email.trim() === '') {
      setEmailError('此欄位不可為空')
      hasError = true
    }
    if (nickName.trim() === '') {
      setNickNameError('此欄位不可為空')
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
    console.log('submit signIn')
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
        id='nickName'
        label='您的暱稱'
        type='text'
        value={nickName}
        placeholder='請輸入您的暱稱'
        errorMessage={nickNameError}
        onChange={onNickNameChange}
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
        type='passwordAgain'
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
            onClick={handleLogin}
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