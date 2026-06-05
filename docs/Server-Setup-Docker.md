### Setup of a Litecoin Explorer instance on Ubuntu 20.04

	# update and install packages
	apt update
	apt upgrade
	apt install docker.io
	
	# get source, npm install
	git clone https://github.com/tech1k/ltc-rpc-explorer.git
	cd ltc-rpc-explorer
	
	# build docker image
	docker build -t ltc-rpc-explorer .

	# run docker image: detached mode, share port 3003, sharing config dir, from the "ltc-rpc-explorer" image made above
	docker run --name=ltc-rpc-explorer -d -v /host-os/env-dir:/container/env-dir --network="host" ltc-rpc-explorer
	