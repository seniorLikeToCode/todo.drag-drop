import { useSortable } from '@dnd-kit/sortable';
import { useEffect, useRef, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import gsap from 'gsap';

export default function List({ name, isCompleted, id, handleRemove, handleCompleted }) {
    const todoRef = useRef(null);
    const nameRef = useRef(null);
    const [lineT, setLineT] = useState('');

    const {
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const animateAndRemoveFromDom = () => {
        console.log('animate button click');
        gsap.to(todoRef.current, {
            duration: 0.4,
            opacity: 0,
            x: 40,
            onComplete: () => {
                handleRemove(id)
            }
        })
    }

    //list item anim
    useEffect(() => {
        gsap.from(nameRef.current, {
            duration: 0.4,
            opacity: 0,
            x: 20,
            delay: -0.1,
            onComplete: () => {
                gsap.to(nameRef.current, {
                    duration: 0.25,
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                })
            }
        })
    }, [isCompleted])


    return (
        <>
            <div style={style} {...attributes} {...listeners} ref={setNodeRef}
                className=
                'flex justify-between  mb-2 text-xl text-zinc-400 rounded p-2 border-f'
            >
                <li className={`active:transform active:scale-95 active:duration-150 hover:scale-105 hover:duration-300 ${isCompleted ? "line-through " : ""}`} ref={todoRef} onDoubleClick={()=> animateAndRemoveFromDom(id)} >
                    <p ref={nameRef} >{name}</p>
                </li>
                <div className="text-2xl text-green-500 mr-2" onClick={() => handleCompleted(id)}>
                    <i className="fa-solid fa-circle-check"></i>
                </div>
            </div>

        </>
    );
}