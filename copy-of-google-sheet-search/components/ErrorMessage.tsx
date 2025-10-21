
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center max-w-2xl mx-auto" role="alert">
      <strong className="font-bold">حدث خطأ!</strong>
      <span className="block sm:inline mr-2">{message}</span>
    </div>
  );
};

export default ErrorMessage;
