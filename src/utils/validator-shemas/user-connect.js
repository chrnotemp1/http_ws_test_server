module.exports = {
	userId: {
		errorMessage: 'userId is wrong',
		isString: true,
		isLength: {
      		options: { min: 5 },
      		errorMessage: 'userId length must be min 5',
    	},
	},
};
