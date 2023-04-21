
export default function List({name,isCompleted,id,handleRemove}) {
    return (
        <div>
            <li onDoubleClick={() => handleRemove(id)}> 
                <p>{name}</p>
            </li>
            <div className="complete-btn">
                <i className="fa-solid fa-circle-check"></i>   
            </div>
            
        </div>
    )
}