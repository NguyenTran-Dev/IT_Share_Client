import { useEffect, useState } from 'react';
import { useAlert } from '../../../../providers/AlertProvider';
import axios from 'axios';
import isLogin from '../../../../filters/isLogin';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../stores/store';
import { IPromptReducer, getListPrompt } from '../../../../reducers/promptReducer';
import { useSelector } from 'react-redux';

interface IPrompt {
  _id: string;
  title: string;
  desc: string;
}

interface IMess {
  role: string; content: string;
}

export const useChatBot = () => {
  const { showAlert } = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const [prompt, setPrompt] = useState<IPrompt>();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [outputText, setOutputText] = useState<IMess[] | []>([]);
  const [language, setLanguage] = useState<string>('English');

  const { prompts, loading } = useSelector<RootState, IPromptReducer>(state => state.promptReducer);
  
  const apiKey = process.env.REACT_APP_API_KEY;
 
  useEffect(() => {
    dispatch(getListPrompt());
  }, []);

  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  function createMessage(content: string) {
    return { role: 'user', content };
  }

  const handleSubmit = async () => {
    if (isLogin()) {
      if (inputText) {
        const data = {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            ...outputText,
            {
              role: 'user',
              content: `${prompt?.desc}\n${inputText ?? ''}\n${language}`,
            },
          ],
        };
        const chatVal = createMessage(inputText);
        setOutputText([...outputText, {...chatVal} ]);
        setIsLoading(true);
        setInputText('');
        setIsSubmit(true);
        axios
          .post('https://api.openai.com/v1/chat/completions', data, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          })
          .then((response) => {
            const rs: IMess[] = Array.isArray(response.data?.choices)
              ? [...outputText, {...chatVal}, {...response.data?.choices?.[0].message }]
              : outputText;
            setOutputText(rs);
          })
          .catch((error) => {
            showAlert({
              title: error?.response?.data?.error?.message,
              status: error?.response?.status,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } else {
      setIsOpen(true);
    }
  };

  return {
    prompts,
    setIsOpen,
    prompt,
    setPrompt,
    handleInputChange,
    handleSubmit,
    outputText,
    isLoading,
    inputText,
    setOutputText,
    isOpen,
    isSubmit,
    setIsSubmit,
    setLanguage,
    loading
  };
};
