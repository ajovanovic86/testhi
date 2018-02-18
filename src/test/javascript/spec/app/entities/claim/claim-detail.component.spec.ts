/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MehanicarTestModule } from '../../../test.module';
import { ClaimDetailComponent } from '../../../../../../main/webapp/app/entities/claim/claim-detail.component';
import { ClaimService } from '../../../../../../main/webapp/app/entities/claim/claim.service';
import { Claim } from '../../../../../../main/webapp/app/entities/claim/claim.model';

describe('Component Tests', () => {

    describe('Claim Management Detail Component', () => {
        let comp: ClaimDetailComponent;
        let fixture: ComponentFixture<ClaimDetailComponent>;
        let service: ClaimService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [ClaimDetailComponent],
                providers: [
                    ClaimService
                ]
            })
            .overrideTemplate(ClaimDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClaimDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClaimService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Claim(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.claim).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
