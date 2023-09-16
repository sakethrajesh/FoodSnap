FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

# Copy the requirements file to the container
COPY requirements.txt .


# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project to the container
COPY . .

# Set the environment variable
ENV FLASK_APP=app.py

# Expose the port that Flask will run on
EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]