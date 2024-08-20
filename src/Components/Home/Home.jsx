import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, name: 'Web Development', description: 'Learn modern web development practices.', image: '/webdev.jfif' },
    { id: 2, name: 'Data Science', description: 'Explore data analysis, machine learning, and more.', image: '/datascience.jfif' },
    { id: 3, name: 'Graphic Design', description: 'Understand the principles of graphic design.', image: '/Graphic-design.webp' },
    { id: 4, name: 'Digital Marketing', description: 'Understand the principles of digital marketing.', image: '/digitalmarkting.jfif' },
  ];

  const handleCourseClick = (course) => {
    navigate('/home/addmission-form', { state: { selectedCourse: course.name } });
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      {/* Announcement Button */}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
      <Button 
        component={Link} // Use Link component as the Button's component
        to="/home/notification"
          variant="contained" 
          color="primary" 
          startIcon={<CampaignIcon style={{ fontSize: '80px', transform: 'rotate(-30deg)' }} />} 
          sx={{
            backgroundColor: '#4A5568',
            color: 'white',
            '&:hover': {
              backgroundColor: '#8CC63F',
              color: 'black',
            }
          }}
        >
          Announcement
        </Button>
      </div>

      {/* Courses Grid */}
      <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {courses.map((course) => (
          <Card 
            key={course.id} 
            sx={{ maxWidth: 345, borderRadius: '16px', boxShadow: 3, transition: 'transform 0.3s, boxShadow 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <CardMedia
              sx={{ height: 140 }}
              image={course.image} // Use the image URL from the course object
              title={course.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {course.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                sx={{ backgroundColor: '#8CC63F', color: 'white', '&:hover': { backgroundColor: '#4A5568' } }}
                onClick={() => handleCourseClick(course)}
              >
                Register Here
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
