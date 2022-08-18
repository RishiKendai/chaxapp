import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { setProfile } from '../utils/APIRoutes';

export default function Test() {
  const [item, setItem] = useState({ title: '', image: '' });
  const [it, setIt] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(setProfile, item);
  };

  //   const getMe = async () => {
//   useEffect(() => {
//     async function callMe() {
//       const response = await axios.get(getProfile);
//       if (response !== '') {
//         setIt(response.data);
//       }
//     }
//     callMe();
//   }, []);
  // }
  //   };
  return (
    <div>
      <input
        type="text"
        name=""
        onChange={(e) => setItem({ ...item, title: e.target.value })}
      />
      <FileBase64
        type="file"
        multiple={false}
        onDone={({ base64 }) => setItem({ ...item, image: base64 })}
      />
      <button onClick={(e) => onSubmitHandler(e)}>Sub</button>
      <button>get</button>

      {it.map((item) => (
        <div key={item._id} className="card">
          <img
            className="activator"
            style={{ width: '500px', height: '500px', objectFit:'cover' }}
            src={item.image}
            alt="nonthi"
          />
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {item.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
