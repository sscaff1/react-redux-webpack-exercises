import React from 'react';

export function DisplayFlex({ children }) {
	return (
		<div>
			{children}
			<style jsx>{`
				div {
					display: flex;
					justify-content: space-between;
				}
			`}</style>
		</div>
	)
}