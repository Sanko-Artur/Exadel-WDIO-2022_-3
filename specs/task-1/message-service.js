const {
  startClientPC,
  startSatelite,
  stopClientPC,
  stopEarthServer,
  stopSatelite,
  stopMarsServer,
  startEarthServer,
  startMarsServer,
  sendMessage,
  assertResponse,
} = require('../stubs/messageservice.stubs');

// REMOVE THE BELOW CODE BEFORE START THE EXERCISE

function startAllNodes() {
  startClientPC();
  const earthToken = startEarthServer();
  const marsToken = startMarsServer();
  startSatelite();
  return {
    earth: earthToken,
    mars: marsToken,
  };
}

function stopAllNodes() {
  stopMarsServer();
  stopEarthServer();
  stopSatelite();
  stopClientPC();
}

describe('Message Sending', function () {
  context('Positive cases: successful sending of messages', function () {
    it('should send message to Earth without error', function () {
      let tokens = startAllNodes();
      const response = sendMessage('Hello earthmen', 'Earth', tokens.earth);
      assertResponse(response, 'Success');
    });

    it('should send message to Mars without error', function () {
      let tokens = startAllNodes();
      const response = sendMessage('Hello martians', 'Mars', tokens.mars);
      assertResponse(response, 'Success');
    });
  });

  context('Negative cases: invalid token', function () {
    it('should get Error message "Security Error" for Earth', function () {
      startAllNodes();
      const response = sendMessage('Hello earthmen', 'Earth', 'M1234');
      assertResponse(response, 'Security Error');
    });

    it('should get Error message "Security Error" for Mars', function () {
      startAllNodes();
      const response = sendMessage('Hello martians', 'Mars', 'E1234');
      assertResponse(response, 'Security Error');
    });
  });

  context(
    'Negative case: valid token and switched off a satellite for Mars',
    function () {
      it('should get Error message "Service is unavailable" for Mars', function () {
        let tokens = startAllNodes();
        stopSatelite();
        const response = sendMessage('Hello martians', 'Mars', tokens.mars);
        assertResponse(response, 'Service is unavailable');
      });
    }
  );

  context(
    'Negative case: invalid token and switched off a satellite for Mars',
    function () {
      it('should get Error message "Service is unavailable" for Mars', function () {
        startClientPC();
        startMarsServer();
        const response = sendMessage('Hello martians', 'Mars', 'E1234');
        assertResponse(response, 'Service is unavailable');
      });
    }
  );

  afterEach(function () {
    stopAllNodes();
  });
});

// npx wdio run ./wdio.conf.js
