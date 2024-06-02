
const Message = () => {
	return (
		<div>
			<div className={`chat chat-end`}>
				<div className='chat-image avatar'>
					<div className='w-10 rounded-full'>
						<img alt='Tailwind CSS chat bubble component' src={"https://lh3.googleusercontent.com/QRJWv7MWuT9w5eZ--yxEHoYa5z4i9-Vzh5t_UyTpRqtY_rz7WJk288jug0E5iB5PSDRcGUU9ZXC3PaUwr4Lua9Te=s1280-w1280-h800"} />
					</div>
				</div>
				<div className={`chat-bubble text-white bg-blue-500`}>testing</div>
				<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>13:9</div>
			</div>
		</div>
	)
};

export default Message;
