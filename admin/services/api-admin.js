function Api () {
    this.arr = [];

    this.callApi = function (uri,method,data) {
        var url = "https://6471f35e6a9370d5a41adcae.mockapi.io/";
        return axios(
            {
                url: `${url}/${uri}`,
                method: method,
                data: data
            })
            
    };
};