export const PostCard = ({title,body,id,cover}) => (
    
        <div className="post">
            <img src={cover} alt={title} />
            <div key={id} className="post-content">
                <h2>{title} {id}</h2>
                <p>{body}</p>
            </div>
        </div>
    );
