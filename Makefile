# =====================================
# 🌱 Project & Environment Configuration
# =====================================
IMAGE_NAME = devutils-web
CONTAINER_NAME = devutils-web
PORT = 8080


# =====================================
# 🐋 Docker Commands
# =====================================
# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

ls: # List files inside the image
	docker run --rm $(IMAGE_NAME) ls -la /usr/share/nginx/html

run: ## Run container with hot reload (mounted volumes)
	@echo "Starting container with hot reload on port $(PORT)..."
	@if docker ps -q -f name=$(CONTAINER_NAME) | grep -q .; then \
		echo "Container $(CONTAINER_NAME) is already running. Stopping it first..."; \
		docker stop $(CONTAINER_NAME) || true; \
		docker rm $(CONTAINER_NAME) || true; \
	fi
	docker run -d -p $(PORT):80 --name $(CONTAINER_NAME) \
		-v "$$(pwd):/usr/share/nginx/html" \
		$(IMAGE_NAME)
	@echo "Container started in dev mode! Visit http://localhost:$(PORT)"


stop: ## Stop the container
	docker stop $(CONTAINER_NAME) || true


remove: ## Remove the container
	docker rm $(CONTAINER_NAME) || true


clean: stop remove ## Clean up everything
	docker rmi $(IMAGE_NAME) || true
	@echo "Cleanup complete!"


rebuild: stop remove build run ## Rebuild and restart


# =====================================
# 📚 Documentation & Help
# =====================================

help: ## Show this help message
	@echo "Available commands:"
	@echo ""
	@python3 -c "import re; lines=open('Makefile', encoding='utf-8').readlines(); targets=[re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$',l) for l in lines]; [print(f'  make {m.group(1):<20} {m.group(2)}') for m in targets if m]"


# =======================
# 🎯 PHONY Targets
# =======================

# Auto-generate PHONY targets (cross-platform)
.PHONY: $(shell python3 -c "import re; print(' '.join(re.findall(r'^([a-zA-Z_-]+):\s*.*?##', open('Makefile', encoding='utf-8').read(), re.MULTILINE)))")

# Test the PHONY generation
# test-phony:
# 	@echo "$(shell python3 -c "import re; print(' '.join(sorted(set(re.findall(r'^([a-zA-Z0-9_-]+):', open('Makefile', encoding='utf-8').read(), re.MULTILINE)))))")"
