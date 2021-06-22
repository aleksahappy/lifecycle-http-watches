import {React, useState} from 'react';
import { nanoid } from 'nanoid';

const initialForm = {
  name: '',
  offset: ''
};

export default function WatchesForm({onAddWatch}) {
  const [form, setForm] = useState(initialForm);

  const onChange = e => {
    const {name, type} = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prevForm => ({...prevForm, [name]: value}));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.offset) {
      return;
    }
    onAddWatch({...form, id: nanoid()});
    setForm(initialForm);
  };

  return (
    <form className="watches-form" onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="name">Название</label>
        <input type="text" value={form.name} id="name" name="name" placeholder="Название" onChange={onChange}/>
      </div>
      <div className="form-field">
        <label htmlFor="offset">Временная зона</label>
        <input type="number" value={form.offset} id="offset" name="offset" placeholder="Смещение в часах" onChange={onChange}/>
      </div>
      <button>Добавить</button>
    </form>
  )
}
