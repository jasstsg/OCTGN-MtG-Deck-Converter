import { useEffect, useState } from 'react';
import './App.css';
import ContentUpload from './components/content-upload';
import ContentDownload from './components/content-download';
import { parseContent } from './services/card-services';

function App() {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (content) {
            console.log(content);
            parseContent(content); // NEW
        }
    }, [content]);

    return (
        <div className="App">
            <ContentUpload onUpload={setContent} />
            <ContentDownload
                content={content}
                fileType="text/xml"
                fileName="file.o8d"
            />
        </div>
    );
}

export default App;
