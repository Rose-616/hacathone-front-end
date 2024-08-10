import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CampaignIcon from '@mui/icons-material/Campaign';

const Home = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, name: 'Web Development', description: 'Learn modern web development practices.', image: 'https://imgs.search.brave.com/9vO_zeCjEWRpEYDumjw-2BLttynFAZWoDF3gXd0IhF8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/MTk3MTYxOS9waG90/by93ZWItZGV2ZWxv/cG1lbnQtYW5kLXdl/Yi1kZXNpZ24tY29u/Y2VwdC1pbi1kYXJr/LWJsdWUtYmFja2dy/b3VuZC1wcm9ncmFt/bWluZy1mb3ItaW50/ZXJuZXQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXNTaWct/cl9RcEYxajZCUHhS/SlMtZW9kcnlMeTZy/UVI3UlVNbXRXNU91/T3c9' },
    { id: 2, name: 'Data Science', description: 'Explore data analysis, machine learning, and more.', image: 'https://imgs.search.brave.com/vSlG4ThkGJriVxlKrZCFVx_V04Ots2HMgkSKLFL5VAo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjE2/OTAyNzY2L3Bob3Rv/L2RlZGljYXRlZC10/by1zb2Z0d2FyZS1k/ZXZlbG9wbWVudC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/RGJlUVpoYTdFRE94/U0NLNDlJT3pQNkRh/VkphQkVsekZJdE9W/SktRU0Rlaz0' },
    { id: 3, name: 'Graphic Design', description: 'Understand the principles of graphic design.', image: 'https://imgs.search.brave.com/HvGtgrgn2LC4I8AWAQbmIyPPBiY49QSj74SY1j0z_NM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzM5Lzc3LzE5/LzM2MF9GXzQzOTc3/MTk1M19FQ3lka1Vz/ODhyc2NNQVEzQWho/SlU5VkR0bEE0SzNH/Ty5qcGc' },
    { id: 4, name: 'Digital Marketing', description: 'Understand the principles of digital marketing.', image: 'https://imgs.search.brave.com/GIlNh6JeQSdBCin4lGp0nFIScW0t8R4ABLr4BhS9kFg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE1/MzM5NzkxMi9waG90/by9kaWdpdGFsLW1h/cmtldGluZy1vbmxp/bmUtdGVjaG5vbG9n/eS1jb25jZXB0Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1S/UmRlVXpaYk55VklI/QmJIVUZoTldaTWdN/TC1od01XeF96Z1lv/SHE3aDhNPQ' },
  ];

  const handleCourseClick = (course) => {
    navigate('/home/addmission-form', { state: { selectedCourse: course.name } });
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      {/* Announcement Button */}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <Button 
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
