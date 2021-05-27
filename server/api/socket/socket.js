exports.estConnection = function(io) {
  io.of("/").on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);

    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });

    socket.on("clientData", (e) => {
      console.log(e);
      io.emit('bilData', e);
    });
  });
}

/*io.of("/api/socket/stock")on('newData', async data => {
  console.log('New Data Arrived');
  await store.dispatch('Products/setProducts', data);
  await sortProducts();
});

exports.bilData = function(data) {
  io.of('/api/socket/bil').emit('data', data);
}*/